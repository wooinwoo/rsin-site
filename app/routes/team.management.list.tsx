import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { CreateEmployeeRequest, Employee } from "~/entities/employees/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import * as EmployeeAPI from "~/features/team/api/employees.server";
import { employeeColumns } from "~/features/team/components/EmployeesTable/columns";
import { TeamMemberAddModal } from "~/features/team/components/TeamMemberAddModal";
import type {
  ActionIntent,
  TeamManagementActionData,
  TeamManagementLoaderData,
} from "~/features/team/types/employeesManagement";
import { getInitialModalData } from "~/features/team/utils/employee";
import { PlusIcon } from "~/shared/ui/icons/PlusIcon";

// Loader
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const data = await EmployeeAPI.getEmployees();
    return json<TeamManagementLoaderData>(data);
  } catch (error) {
    throw json({ message: "직원 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

// Action
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as ActionIntent;

  try {
    switch (intent) {
      case "create": {
        const rawData = Object.fromEntries(formData);
        const data: CreateEmployeeRequest = {
          name: String(rawData.name),
          email: String(rawData.email),
          phone: String(rawData.phone),
          departmentId: Number(rawData.departmentId),
          empNo: String(rawData.empNo),
          position: String(rawData.position),
          joinedAt: String(rawData.joinedAt),
          birth: String(rawData.birth),
          role: "user",
          mbti: rawData.mbti ? String(rawData.mbti) : "",
        };

        const result = await EmployeeAPI.createEmployee(data);
        return json<TeamManagementActionData>(result);
      }
      case "update": {
        const empNo = Number(formData.get("empNo"));
        const data = Object.fromEntries(formData);
        delete data.intent;
        delete data.empNo;
        const result = await EmployeeAPI.updateEmployee(empNo, data);
        return json({ success: true, message: "팀원이 추가되었습니다." });
      }
      case "resign": {
        const empNo = Number(formData.get("empNo"));
        const resignedAt = formData.get("resignedAt") as string;
        const result = await EmployeeAPI.resignEmployee(empNo, resignedAt);
        return json({ success: true, message: "퇴사 처리가 완료되었습니다." });
      }
      default:
        return json({ success: false, message: "잘못된 요청입니다." }, { status: 400 });
    }
  } catch (error) {
    throw json(
      {
        success: false,
        message: error instanceof Error ? error.message : "오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

export default function TeamManagementListPage() {
  const { employees } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Employee | null>(null);

  // 액션 결과 처리
  useEffect(() => {
    if (actionData) {
      alert(actionData.message);
      if (actionData.success) {
        setIsModalOpen(false);
        setSelectedMember(null);
      }
    }
  }, [actionData]);

  const handleRowClick = (member: Employee) => {
    console.log("handleRowClick", member);
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <>
      <TeamMemberAddModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMember(null);
        }}
        mode={selectedMember ? "edit" : "add"}
        initialData={getInitialModalData(selectedMember)}
        onSubmit={async (data) => {
          // async 추가
          const formData = new FormData();

          if (selectedMember) {
            formData.append("intent", "update");
            formData.append("empNo", selectedMember.empNo.toString());
          } else {
            formData.append("intent", "create");
          }

          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              formData.append(key, value.toString());
            }
          });

          await submit(formData, { method: "post" });
        }}
        onResign={
          selectedMember
            ? async () => {
                // async 추가
                const formData = new FormData();
                formData.append("intent", "resign");
                formData.append("empNo", selectedMember.empNo.toString());
                formData.append("resignedAt", new Date().toISOString());
                await submit(formData, { method: "post" });
              }
            : undefined
        }
      />

      <DataTable
        data={employees}
        columns={employeeColumns}
        onRowClick={handleRowClick}
        enableSearch
        toolbarButtons={[
          {
            label: "팀원추가",
            onClick: () => {
              setSelectedMember(null);
              setIsModalOpen(true);
            },
            variant: "primary",
            icon: <PlusIcon />,
          },
        ]}
      />
    </>
  );
}
