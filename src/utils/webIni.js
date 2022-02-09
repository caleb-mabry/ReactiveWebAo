const parse = (data) => {
  const regex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    param: /^\s*([\w.\-_]+)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
  };
  const value = {};
  const lines = data.split(/\r\n|\r|\n/);
  let section;
  lines.forEach(function (line) {
    if (regex.comment.test(line)) {
      return;
    } else if (line.length === 0) {
      return;
    } else if (regex.param.test(line)) {
      const match = line.match(regex.param);
      if (section) {
        if (match[1].toLowerCase() === "showname") {
          //don't lowercase the showname
          value[section]["showname"] = match[2];
        } else {
          value[section][match[1].toLowerCase()] = match[2].toLowerCase();
        }
        //} else { // we don't care about attributes without a section
        //	value[match[1]] = match[2];
      }
    } else if (regex.section.test(line)) {
      const match = line.match(regex.section);
      value[match[1].toLowerCase()] = {}; //lowercase everything else
      section = match[1].toLowerCase();
    }
  });
  return value;
};
export default parse;
