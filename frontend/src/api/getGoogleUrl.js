function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/outh2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:4000/api/auth/google",
    client_id:
      "191935821390-jbq4aamvi3rb5rn98rsfpcm0sbcdtbj2.apps.googleusercontent.com",
    access_type: "offline",
    sponse_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
