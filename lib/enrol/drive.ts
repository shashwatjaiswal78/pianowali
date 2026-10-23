import "server-only";
import { auth, drive } from "@googleapis/drive";

/* The course folder on Google Drive stays Restricted. A service account —
 * added to the folder as an Editor, and able to see nothing else — adds each
 * buyer as a Viewer, and removes them again on a refund. */

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

function client() {
  const jwt = new auth.JWT({
    email: env("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    /* Vercel stores the key's line breaks as literal "\n" */
    key: env("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  return drive({ version: "v3", auth: jwt });
}

export const folderUrl = () =>
  `https://drive.google.com/drive/folders/${env("DRIVE_FOLDER_ID")}`;

/* Google's own "X shared a folder with you" email is switched off: the
 * welcome email carries the link instead. Sharing with someone who already
 * has access is harmless. Throws if the address isn't a Google account. */
export async function shareFolder(gmail: string) {
  await client().permissions.create({
    fileId: env("DRIVE_FOLDER_ID"),
    sendNotificationEmail: false,
    requestBody: { type: "user", role: "reader", emailAddress: gmail },
  });
}

/* Removes a buyer's Viewer access. Owners and editors are never touched. */
export async function unshareFolder(gmail: string) {
  const d = client();
  const fileId = env("DRIVE_FOLDER_ID");
  const { data } = await d.permissions.list({
    fileId,
    fields: "permissions(id,emailAddress,role)",
  });
  const match = data.permissions?.find(
    (p) => p.role === "reader" && p.emailAddress?.toLowerCase() === gmail,
  );
  if (!match?.id) return false;
  await d.permissions.delete({ fileId, permissionId: match.id });
  return true;
}
