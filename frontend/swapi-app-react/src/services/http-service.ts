import apiClient from "./api-client";

export class HttpService<T> {
  getAll<T>(endpoint: string) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(endpoint, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  create<T>(endpoint: string, entity: T) {
    return apiClient.post(endpoint, entity);
  }

  update(endpoint: string) {
    return apiClient.patch(endpoint);
  }

  delete(endpoint: string) {
    return apiClient.delete(endpoint);
  }
}

const createHttpService = () => new HttpService()

export default createHttpService;