import DOMPurify from "dompurify";

const CleanString = () => {
  const inputString = `Hello <b>world</b> <script>alert("hack!")</script>`;
  const clean = DOMPurify.sanitize(inputString, {
    ALLOWED_TAGS: ["b", "i"],
    ALLOWED_ATTR: [],
  });

  console.log(clean);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};

export default CleanString;
