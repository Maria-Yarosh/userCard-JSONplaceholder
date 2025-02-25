import { navigate } from "../router/router";

export const UserCard = ({ user }) => {
    const { email, phone, website, company, name: userName, username: nickName, id: userId } = user;
    const { name: companyName } = company;
  
    const card = document.createElement("div");
    card.className = "user-card";
  
    const userAvatar = document.createElement("div");
    userAvatar.className = "user-avatar";
    userAvatar.textContent = userName[0];
  
    const name = document.createElement("h2");
    name.className = "user-name";
    name.textContent = userName;
  const username = document.createElement("p");
    username.className = "user-username";
    username.textContent = `@${nickName}`;
  
    const userInfo = document.createElement("div");
    userInfo.className = "user-info";
  
    const infoItems = [
      { icon: "📧", text: email },
      { icon: "📱", text: phone },
      { icon: "🌐", text: website },
      { icon: "🏢", text: companyName },
    ];
  infoItems.forEach((item) => {
      const { icon: infoIcon, text: infoText } = item;
      const infoItem = document.createElement("div");
      infoItem.className = "info-item";
  
      const icon = document.createElement("span");
      icon.className = "info-icon";
      icon.textContent = infoIcon;
  
      const text = document.createElement("p");
      text.textContent = infoText;
  
      infoItem.append(icon, text);
      userInfo.append(infoItem);
    });
    card.append(userAvatar, name, username, userInfo);
  card.addEventListener("click", () => {
    navigate(`/posts/${userId}`);
  });

  return card;
};