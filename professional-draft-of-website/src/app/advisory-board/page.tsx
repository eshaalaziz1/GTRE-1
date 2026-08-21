import { redirect } from "next/navigation";

// The Advisory Board is no longer a separate tab, its content lives on the
// Alumni page (Advisory Board + Alumni Board sections). Old links redirect there.
export default function AdvisoryBoardPage() {
  redirect("/alumni");
}
