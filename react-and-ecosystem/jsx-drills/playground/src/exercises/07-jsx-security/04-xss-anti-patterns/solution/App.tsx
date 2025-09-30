import DOMPurify from "dompurify";

const IdentifyDangerousPatterns = () => {
  const dangerousText =
    '<img src="x" onerror="alert(`XSS`)">Hello <b>world</b>';
  const cleanText = DOMPurify.sanitize(dangerousText, {
    ALLOWED_TAGS: ["b", "i"],
    ALLOWED_ATTR: [],
  });

  return (
    <div>
      <h1>Injecting via data</h1>
      {dangerousText}
      <br></br>
      <h1>Injecting via dangerouslySetInnerHTML</h1>
      <div dangerouslySetInnerHTML={{ __html: dangerousText }}></div>
      <br></br>
      <h1>Injecting via dangerouslySetInnerHTML with sanitize</h1>
      <div dangerouslySetInnerHTML={{ __html: cleanText }}></div>
    </div>
  );
};

export default IdentifyDangerousPatterns;
