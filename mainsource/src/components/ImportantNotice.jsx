import React from "react";

function ImportantNotice() {
  return (
    <div className="ms-5 me-5 w-90vw md:ms-20 md:me-20 md:w-[55%] mt-16  ">
      <p className="ms-5 font-semibold text-2xl">Important Info</p>

      <p className="mt-10">
        <span className="font-semibold text-xl">Check-In -</span>2.30 pm
      </p>
      <p>
        <span className="font-semibold text-xl">Check-Out -</span>9.30 am
      </p>
      <p className="font-semibold text-xl">Accessible By:</p>
      <p>Bikes, Cars & Public Transport (Bus + Rickshaw / Train + Rickshaw)</p>

      <p className="mt-10 font-semibold text-xl">Best Time to visit:</p>
      <p>July - March</p>

      <p className="mt-10 font-semibold text-xl">Cancellation Policy:</p>
     
      <ul className="list-disc list-outside ms-7" role='list'>

        <li className="list-item">
          75% refund for all cancellations done 7 days before the date of stay
        </li>
        <li>No refund for cancellations within 7 days from the date of stay</li>
        <li>Booking dates cannot be transferred / rescheduled</li>
        <li>
          In case of govt. imposed lockdowns / Covid disruptions, an option to
          reschedule booking to any other date within a year will be given. No
          refund will be issued.
        </li>
        <li>
          Refunds if any will be credited to the source account in 7 working
          days 
        </li>

      </ul>

      <p className="mt-10 font-semibold text-xl">
        Kids age bracket 4 - 6 yrs (Below 4 free of cost)
      </p>
      <p className="font-semibold text-xl">
        Early check-in & late check-out strictly not possible as the campsite
        needs to be sanitised for arriving guests. 
      </p>
    </div>
  );
}
export default ImportantNotice;
