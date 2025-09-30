const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('pl-PL');
    return formatter.format(date)
}

const RenderDate = ({date} : {date: Date}) => {
    const formatedDate = formatDate(date)
    return (<time dateTime={date.toISOString()}>{formatedDate}</time>)

}
export default RenderDate