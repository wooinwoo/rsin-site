import { client } from "~/shared/api";
import type {
  Employee,
  CreateEmployeeRequest,
  GetEmployeesParams,
  UpdateEmployeeRequest,
  GetThumbnailUploadUrlResponse,
} from "./model";

interface ApiResponse<T> {
  data: T;
}

export const employeeApi = {
  getEmployees(
    cookieHeader: string | null,
    params: GetEmployeesParams
  ): Promise<ApiResponse<{ totalCount: number; employees: Employee[] }>> {
    return client.get(`/employees?size=${params.size}&page=${params.page}`, {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
  },

  createEmployee(cookieHeader: string, data: CreateEmployeeRequest) {
    return client.post(`/employees`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  updateEmployee(cookieHeader: string, empNo: number, data: UpdateEmployeeRequest) {
    return client.patch(`/employees/${empNo}`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  resignEmployee(cookieHeader: string, id: number, data: { resignedAt: string }) {
    return client.patch(`/employees/${id}/resign`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },
  getSelf() {
    return client.get<Employee>("/employees/self");
  },

  updateSelf(
    cookieHeader: string,
    data: { email?: string; phone?: string; birth?: string; mbti?: string }
  ) {
    return client.patch("/employees/self", data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  // 썸네일 업로드 URL 발급
  getThumbnailUploadUrl(cookieHeader: string, path: string) {
    return client.get<GetThumbnailUploadUrlResponse>(
      `/employees/self/thumbnail/upload-url?path=${path}`,
      {
        headers: { Cookie: cookieHeader || "" },
      }
    );
  },
};
