import { createHmac } from "crypto";

function createManifest(
  dataID: string | null,
  xSignature: string | null,
  xRequestId: string | null
) {
  let ts;
  let hash;

  const parts = xSignature?.split(",");

  parts?.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const secretKey =
    "7e7a493e96d3c382de354891204c19876697fba26d70d8f7a08b666473daab2c";

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  console.log(manifest, "manifest");

  const hmac = createHmac("sha256", secretKey);

  hmac.update(manifest);

  const sha = hmac.digest("hex");

  console.log(sha, "digested hmac");

  console.log(hash, "this is the hash, check if they are the same");

  if (sha === hash) {
    console.log(
      "The payment has matched the sha and hash. The payment is valid."
    );
    return true;
  } else {
    console.log("we got to the false state");
    false;
  }
}

export default createManifest;
