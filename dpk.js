const crypto = require("crypto");

const hashOps = {
  algo: "sha3-512",
  digestEncoding: "hex"
}

exports.deterministicPartitionKey = (event, TRIVIAL_PARTITION_KEY = "0", MAX_PARTITION_KEY_LENGTH = 256) => {
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  candidate = event.partitionKey ? JSON.stringify(event.partitionKey) : crypto.createHash(hashOps.algo).update(JSON.stringify(event)).digest(hashOps.digestEncoding);
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? crypto.createHash(hashOps.algo).update(candidate).digest(hashOps.digestEncoding) : candidate;
};