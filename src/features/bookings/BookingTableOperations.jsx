
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Select from "../../ui/Select"
function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
       FilterFiled="status"
       opotions={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <Select
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
        type='white'
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
