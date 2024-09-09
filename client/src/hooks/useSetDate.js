export const UseformatDate = (dateString) => {
    if(!dateString)
        return `dd-mm-yyyy`
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const monthName = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day}-${monthName}-${year}`;
}


