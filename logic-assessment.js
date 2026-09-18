function countCharacterFrequency(str) {
  const frequency = {};
  const lowerCaseStr = str.toLowerCase();
  for (let char of lowerCaseStr) {
    if (char >= "a" && char <= "z") {
      frequency[char] = (frequency[char] || 0) + 1;
    }
  }
  
  return frequency;
}

function processUserData(users) {
  const groupedUsers = {};

  for (const user of users) {
    
    const isValidUser =
      user &&
      typeof user.age === "number" &&
      Number.isFinite(user.age) &&
      user.age >= 18 &&
      user.gender != null &&
      typeof user.gender === "string" &&
      user.gender.trim() !== "";

    if (!isValidUser) {
      continue;
    }

    if (!groupedUsers[user.gender]) {
      groupedUsers[user.gender] = { count: 0, averageAge: 0, totalAge: 0, users: [] };
    }

    const group = groupedUsers[user.gender];
    group.count += 1;
    group.totalAge += user.age;
    group.users.push(user);
  }

  for (const group of Object.values(groupedUsers)) {
    group.averageAge = Math.round((group.totalAge / group.count) * 10) / 10;
    delete group.totalAge;
  }

  return groupedUsers;
}

export { countCharacterFrequency, processUserData };
