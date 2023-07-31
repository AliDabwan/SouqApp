export interface PaginationData {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
}

export class PaginatedResponse<T>{
    items: T;
    paginationData: PaginationData;
    constructor(items: T, paginationData: PaginationData) {
        this.items = items;
        this.paginationData = paginationData;
    }
}