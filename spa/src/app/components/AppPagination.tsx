import { Box, Pagination, Typography } from "@mui/material";
import { PaginationData } from "../models/PaginationData";


type Props={
    paginationData:PaginationData
    onPageChange:(page:number)=>void
}
export default function AppPagination({paginationData,onPageChange}:Props) {
    const {currentPage,pageSize,totalCount,totalPages}=paginationData
  return (
<Box sx={{mt:-1}} display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography sx={{ml:1}} > 
                    Displaying {(currentPage - 1) * pageSize + 1} -
                    {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize }
                     of {totalCount} items
                    </Typography>
                    <Pagination 
                    shape="rounded"
                    color="primary"
                    size="large"
                    count={totalPages}
                    page={currentPage}
                    onChange={(e,page)=>onPageChange(page)}
                    />
                </Box>  )
}
