const formatString = str => str.replace(/([A-Z])/g, ' $1').replace(/^./, letter => letter.toUpperCase());

export default formatString;
