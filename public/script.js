const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userIdInput = document.getElementById('userId');

const API = '/api/users';

const fetchUsers = async () => {
  const res = await fetch(API);
  const users = await res.json();

  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${user.name} (${user.email})</span>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editUser('${user._id}', '${user.name}', '${user.email}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
      </div>
    `;
    userList.appendChild(li);
  });
};

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = userIdInput.value;
  const payload = {
    name: nameInput.value,
    email: emailInput.value
  };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  userForm.reset();
  userIdInput.value = '';
  fetchUsers();
});

const editUser = (id, name, email) => {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
};

const deleteUser = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchUsers();
};

fetchUsers();
