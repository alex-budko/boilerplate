import axios from "axios";
import { auth } from "../firebase/firebase";

interface FileResult {
  filename: string;
  content: string;
}

export const uploadFilesToRepo = async (
  token: string,
  files: FileResult[],
  repoName: string
) => {
  for (const file of files) {
    try {
      const content = btoa(file.content);
      const user = auth.currentUser;

      if (!user) {
        console.error("No authenticated user");
        return;
      }

      if (token) {
        try {
          const response = await axios.get("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const username = response.data.login;

          await axios.put(
            `https://api.github.com/repos/${username}/${repoName}/contents/${file.filename}`,
            {
              message: `commit from firebase app`,
              content: content,
              committer: {
                name: user.displayName,
                email: user.email,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );

          console.log(`Uploaded ${file.filename}`);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(`Error uploading ${file.filename}`, error);
    }
  }
};

export const createRepoAndUploadFiles = async (
  token: string,
  files: FileResult[],
  repoName: string
) => {
  try {
    const repo = await axios.post(
      `https://api.github.com/user/repos`,
      {
        name: repoName,
        description: "Testing Boilerplate repo",
        homepage: "https://github.com",
        private: false,
        is_template: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    setTimeout(() => uploadFilesToRepo(token, files, repoName), 1000);
  } catch (error) {
    console.error("Error creating new repository", error);
  }
};
