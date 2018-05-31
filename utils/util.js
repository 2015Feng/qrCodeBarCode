const formatTime = (template, date) => {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i)   {
    return template.split(specs[i]).join(item);
  }, template);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
