import AccountCard from "./account-card";

const AccountsPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Your accounts</h1>
      <label>
        поиск по аккаунтам
        <input className="border rounded border-primary" type="text" />
      </label>
      <AccountCard />
      <AccountCard />
      <AccountCard />
    </div>
  );
};

export default AccountsPage;
