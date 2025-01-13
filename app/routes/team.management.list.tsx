import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type {
  CreateEmployeeRequest,
  Employee,
  GetEmployeesParams,
  UpdateEmployeeRequest,
} from "~/entities/employees/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import * as EmployeeAPI from "~/features/team/api/employees.server";
import { employeeColumns, searchFields } from "~/features/team/components/EmployeesTable/columns";
import { TeamMemberAddModal } from "~/features/team/components/TeamMemberAddModal";
import { TeamMemberCard } from "~/features/team/components/TeamMemberCard";
import type {
  ActionIntent,
  TeamManagementLoaderData,
} from "~/features/team/types/employeesManagement";
import { getInitialModalData } from "~/features/team/utils/employee";
import { useAuthStore } from "~/shared/store/auth";
import { PlusIcon } from "~/shared/ui/icons/PlusIcon";
// Loader
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // page와 size가 없으면 기본값으로 리다이렉트
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");

  if (!page || !size) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    return redirect(newUrl.toString());
  }

  const params: GetEmployeesParams = {
    size: Number(size),
    page: Number(page),
    departmentId: url.searchParams.get("departmentId")
      ? Number(url.searchParams.get("departmentId"))
      : undefined,
    employeeName: url.searchParams.get("employeeName") || undefined,
  };

  try {
    const data = await EmployeeAPI.getEmployees(request, params);
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
          position: String(rawData.position),
          joinedAt: String(rawData.joinedAt),
          birth: String(rawData.birth),
          role: "employee",
          mbti: rawData.mbti ? String(rawData.mbti) : "",
        };

        return await EmployeeAPI.createEmployee(request, data);
      }
      case "update": {
        const rawData = Object.fromEntries(formData);

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

        return await EmployeeAPI.updateEmployee(request, Number(rawData.id), data);
      }
      case "resign": {
        const id = Number(formData.get("id"));
        const resignedAt = formData.get("resignedAt") as string;
        return await EmployeeAPI.resignEmployee(request, id, resignedAt);
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
  const { employees, totalCount } = useLoaderData<typeof loader>(); // totalCount 추가
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Employee | null>(null);
  const user = useAuthStore((state) => state.user);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  // 액션 결과 처리
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setIsModalOpen(false);
        setSelectedMember(null);
      }
    }
  }, [actionData]);

  const handleRowClick = (member: Employee) => {
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
        onRowClick={user?.role === "admin" ? handleRowClick : undefined}
        enableSearch
        searchFields={searchFields}
        onSearch={(values) => {
          const params = new URLSearchParams(searchParams);
          Object.entries(values).forEach(([key, value]) => {
            if (value) {
              params.set(key, value);
            } else {
              params.delete(key);
            }
          });
          params.set("page", "1"); // 검색 시 첫 페이지로
          submit(params);
        }}
        mobileCard={TeamMemberCard}
        pagination={{
          currentPage,
          pageSize,
          totalItems: totalCount,
          onPageChange: (page, size) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            params.set("size", size.toString());
            submit(params);
          },
        }}
        toolbarButtons={
          user?.role === "admin"
            ? [
                {
                  label: "팀원추가",
                  onClick: () => {
                    setSelectedMember(null);
                    setIsModalOpen(true);
                  },
                  variant: "primary",
                  icon: <PlusIcon />,
                },
              ]
            : []
        }
      />
    </>
  );
}
