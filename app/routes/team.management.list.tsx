import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type {
  CreateEmployeeRequest,
  Employee,
  UpdateEmployeeRequest,
} from "~/entities/employees/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import * as EmployeeAPI from "~/features/team/api/employees.server";
import { employeeColumns } from "~/features/team/components/EmployeesTable/columns";
import { TeamMemberAddModal } from "~/features/team/components/TeamMemberAddModal";
import type {
  ActionIntent,
  TeamManagementLoaderData,
} from "~/features/team/types/employeesManagement";
import { getInitialModalData } from "~/features/team/utils/employee";
import { PlusIcon } from "~/shared/ui/icons/PlusIcon";
import { TeamMemberCard } from "~/features/team/components/TeamMemberCard";

// Loader
export async function loader({ request }: LoaderFunctionArgs) {
  const data = await EmployeeAPI.getEmployees(request);
  return json<TeamManagementLoaderData>(data);

  throw json({ message: "직원 목록을 불러오는데 실패했습니다." }, { status: 500 });
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
          position: String(rawData.position),
          joinedAt: String(rawData.joinedAt),
          birth: String(rawData.birth),
          role: "employee",
          mbti: rawData.mbti ? String(rawData.mbti) : "",
        };

        console.log(data);

        const result = await EmployeeAPI.createEmployee(request, data);
        return json(result);
      }
      case "update": {
        const rawData = Object.fromEntries(formData);

        console.log("Raw FormData:", rawData);

        delete rawData.intent;
        delete rawData.empNo;

        // API 스펙에 맞게 데이터 변환
        const data: UpdateEmployeeRequest = {
          name: String(rawData.name),
          phone: String(rawData.phone),
          email: String(rawData.email),
          departmentId: Number(rawData.departmentId),
          position: String(rawData.position),
          joinedAt: String(rawData.joinedAt),
          birth: String(rawData.birth),
          mbti: rawData.mbti ? String(rawData.mbti) : undefined,
          role: String(rawData.role) as "admin" | "user",
        };

        const result = await EmployeeAPI.updateEmployee(request, Number(rawData.id), data);
        console.log("Update API Result:", result);

        return json({
          success: true,
          message: "정상적으로 수정되었습니다.",
        });
      }
      case "resign": {
        const id = Number(formData.get("id"));
        const resignedAt = formData.get("resignedAt") as string;
        const result = await EmployeeAPI.resignEmployee(request, id, resignedAt);
        return json(result);
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
        initialData={selectedMember ? getInitialModalData(selectedMember) : undefined}
        onSubmit={async (data) => {
          // async 추가
          console.log(data);
          const formData = new FormData();

          if (selectedMember) {
            formData.append("intent", "update");
            formData.append("id", selectedMember.id.toString());
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
                formData.append("id", selectedMember.id.toString());
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
        mobileCard={TeamMemberCard}
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
