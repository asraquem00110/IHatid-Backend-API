export interface FilterOtions {
    dateFrom?: Date,
    dateTo?: Date,
    refNo: string,
}

export interface IUser {
    getHistory: (id?: string) => Promise<Array<Object>>,
    getFilteredHistory: (filterOptions: FilterOtions) => Promise<Array<Object>>,
}