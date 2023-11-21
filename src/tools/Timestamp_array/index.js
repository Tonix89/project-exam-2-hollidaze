export const getTimeStamp = (data) => {

    const timesstamps = [];

    const timeStampArrays = data.bookings.map((bookings) => {
                const newDateFrom = new Date(bookings.dateFrom).toISOString();
                const newDateTo = new Date(bookings.dateTo).toISOString();
        
    
                const startTimestamp = new Date(newDateFrom).getTime();
                const finishTimestamp = new Date(newDateTo).getTime();

    
                const stampsArray = [];
                let currentDate = new Date(startTimestamp);
    
                while (currentDate.getTime() <= finishTimestamp) {
                    stampsArray.push(currentDate.toISOString().split("T")[0]);
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                return stampsArray;
    
            });

    timeStampArrays.forEach(arrays => {
        arrays.forEach(array => {
            timesstamps.push(array);
        })
    });

    function removeDuplicateValues(array) {
        const uniqueArray = array.filter((currentObj, index, self) => {
          return (
            index ===
            self.findIndex(
              (compareObj) =>
                JSON.stringify(compareObj) === JSON.stringify(currentObj)
            )
          );
        });
      
        return uniqueArray;
      }

    const uniqueArray = removeDuplicateValues(timesstamps);

    const calWeek = document.querySelectorAll(".MuiDayCalendar-weekContainer button");

    const calArray = Array.from(calWeek);

    const daysArray = [];



    calArray.forEach((week) => {

        const timeStamp = parseInt(week.getAttribute("data-timestamp"), 10);

        const date = new Date(timeStamp);

        const isoStringDate = date.toLocaleDateString().split("/");
        const formattedDate = `${isoStringDate[2]}-${isoStringDate[0].padStart(2, '0')}-${isoStringDate[1].padStart(2, '0')}`;

        uniqueArray.forEach((array) => {
            if(array === formattedDate){
                daysArray.push(timeStamp);
            }
        })
    
    })

    return daysArray;
}