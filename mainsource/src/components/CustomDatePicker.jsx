// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";

// export default function CustomDatePicker({ value, onChange, placeholder }) {
//   const handleDateChange = (date) => {
//     if (date) {
//       const formatted = format(date, "yyyy-MM-dd"); // ✅ store yyyy-mm-dd
//       onChange(formatted);
//     } else {
//       onChange(null);
//     }
//   };

//   // If value exists (string yyyy-mm-dd), create Date object
//   const parsedDate = value ? new Date(value) : null;

//   return (
//     <DatePicker
//       selected={parsedDate}
//       onChange={handleDateChange}
//       placeholderText={placeholder || "Select Date"}
//       dateFormat="yyyy-MM-dd"
//       className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
//     />
//   );
// }

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({
  value,
  onChange,
  placeholder,
  pastDateRestrict,
}) {
  const handleDateChange = (date) => {
    if (date) {
      const formatted = format(date, "yyyy-MM-dd"); // ✅ store yyyy-mm-dd
      onChange(formatted);
    } else {
      onChange(null);
    }
  };

  // If value exists (string yyyy-mm-dd), create Date object
  const parsedDate = value ? new Date(value) : null;

  return (
    <>
      {pastDateRestrict ? (
        <DatePicker
          selected={parsedDate}
          onChange={handleDateChange}
          placeholderText={placeholder || "Select Date"}
          dateFormat="yyyy-MM-dd"
          className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
          minDate={new Date()} // ✅ disables all past dates
        />
      ) : (
        <DatePicker
          selected={parsedDate}
          onChange={handleDateChange}
          placeholderText={placeholder || "Select Date"}
          dateFormat="yyyy-MM-dd"
          className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
        />
      )}
    </>
  );
}
