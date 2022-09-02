import axios from "axios";

function triggerBuild() {
  const triggerBuildUrl = process.env.BUILD_TRIGGER_URL;
  if (triggerBuildUrl != null) {
    axios.post(triggerBuildUrl).catch(err => console.log(err));
  }
}

export default triggerBuild;
