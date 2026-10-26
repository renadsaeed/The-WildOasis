
import React from 'react'
import TableOperations from "../../ui/TableOperations";
import Select  from "../../ui/Select";
import Filter from "../../ui/Filter";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter FilterFiled='discount' opotions={[{ value: "all" , label: 'All' } , { value: "with-discount" , label: 'with Discount' },{ value: "no-discount" , label: 'without Discount' }]} />
         <Select  options={[ { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },]} type="white" />
    </TableOperations>
  )
}

export default CabinTableOperations
