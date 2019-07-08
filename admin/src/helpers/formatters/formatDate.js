const formatDate = date => `${date.toDateString()}, ${date.toTimeString().slice(0, 5)}`;

export default formatDate;
