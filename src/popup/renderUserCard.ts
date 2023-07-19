import { User } from "../background/ChatterboxClient/ChatterboxClient";

export const renderUserCard = (user: User) => {
  return `
<div class="card" data-id="cb-user">
    <div class="card__header">
        Thank you for staying with us, <span class="highlight" data-id="cb-username">${user.username}</span>!
    </div>
    
    <div class="card__content">
        <h3>Transactions</h3>
        <div class="item"><span>11.02.2023</span><span>+$1.0</span></div>
        <h3>Queries</h3>
        <div class="item"><span>11.02.2023</span><span>-$0.03</span></div>
    </div>
    
    <div class="card__footer">
        <span class="link">Top up your balance, write @evanchesnokov</span>
        <span>BALANCE: ${user.getBalance}</span>
    </div>
</div>
    `;
};
