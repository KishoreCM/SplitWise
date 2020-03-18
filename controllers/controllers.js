const { Op } = require("sequelize");

const models = {
  Users: require("../models/Users"),
  Groups: require("../models/Groups"),
  Expense: require("../models/Expense"),
  Friends: require("../models/Friends")
};

//const createUser = (req, res) => console.log(req.fields);
const createUser = async (req, res) => {
  try {
    const post = await models.Users.create(req.fields);
    return res.status(201).send("Registered Successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await models.Users.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUserGroups = async (req, res) => {
  try {
    const groups = await models.Groups.findAll({
      where: {
        created_by: req.fields.created_by
      },
      order: [["id", "ASC"]]
    });

    for (let group of groups) {
      const expense = await models.Expense.findAll({
        where: {
          groups_id: group.dataValues.id
        }
      });
      group.dataValues["expenses"] = expense;

      const friends = await models.Friends.findAll({
        where: {
          groups_id: group.dataValues.id
        },
        order: [["id", "ASC"]]
      });
      group.dataValues["friends"] = friends;
    }
    console.log(groups);
    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createGroup = async (req, res) => {
  try {
    const user = await models.Users.findOne({
      where: {
        email: req.fields.created_by
      },
      attributes: ["id"]
    });
    await models.Groups.create(req.fields);
    await models.Groups.update(
      { user_id: user.dataValues.id },
      {
        where: {
          created_by: req.fields.created_by
        }
      }
    );
    return res.status(201).send("Group Created!!!");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const createFriends = async (req, res) => {
  try {
    const friends = JSON.parse(req.fields.friends);
    const groupId = await models.Groups.findOne({
      where: {
        [Op.and]: [
          { created_by: req.fields.created_by },
          { name: req.fields.group_name }
        ]
      },
      attributes: ["id"]
    });
    //console.log(groupId);
    for (let i = 0; i < friends.length; i++) {
      await models.Friends.create({
        from_expense: friends[i].from_expense,
        name: friends[i].name,
        tot_owes: friends[i].owes,
        groups_id: groupId.dataValues.id
      });
    }

    return res.status(201).send("Group Friends Created!!!");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserGroupFriends = async (req, res) => {
  try {
    /*
    const groupId = req.fields.group_id;
    const friends = await models.Friends.findAll({
      where: {
        groups_id: groupId
      }
    });
    */
    const groups = await models.Groups.findAll({
      where: {
        created_by: req.fields.user
      },
      attributes: ["id"]
    });
    console.log(groups.length);

    let grpFriends = [];
    for (let group of groups) {
      //console.log("---groupsID-----", group.dataValues);
      friends = await models.Friends.findAll({
        where: {
          groups_id: group.dataValues.id
        }
      });
      grpFriends.push(friends);
    }
    //console.log("---------grpFriends---------", grpFriends);
    return res.status(200).json({ grpFriends });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserFirstGrp = async (req, res) => {
  try {
    const group = await models.Groups.findOne({
      where: {
        created_by: req.fields.user
      },
      attributes: ["name"]
    });
    res.status(200).send(Boolean(group));
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    //console.log("------------addExpense-------------", req.fields);

    await models.Expense.create({
      mem_count: req.fields.mem_count,
      name: req.fields.name,
      you_paid: req.fields.you_paid,
      you_lent: req.fields.you_lent,
      on_month: req.fields.on_month,
      on_date: req.fields.on_date,
      groups_id: req.fields.groups_id
    });

    let friends = await models.Friends.findAll({
      where: {
        groups_id: req.fields.groups_id
      }
    });

    //console.log("Expense: ", friends[0].dataValues);

    for (let friend of friends) {
      await models.Friends.update(
        {
          tot_owes: Number(
            (Number(friend.tot_owes) + Number(req.fields.tot_owes)).toFixed(2)
          )
        },
        {
          where: {
            id: friend.id
          }
        }
      );
    }

    let group = await models.Groups.findOne({
      where: {
        id: friends[0].dataValues.groups_id
      }
    });

    let tot_owed = Number(
      (Number(group.dataValues.tot_owed) + Number(req.fields.tot_owed)).toFixed(
        2
      )
    );

    await models.Groups.update(
      {
        tot_owed: tot_owed
      },
      {
        where: {
          id: group.dataValues.id
        }
      }
    );

    res.status(201).send("Expense Added!!!");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const currentExpense = JSON.parse(req.fields.currentExpense);
    const groupID = currentExpense.groups_id;
    const totalOwed = req.fields.totalOwed;
    const grpFriends = JSON.parse(req.fields.grpFriends);

    await models.Groups.update(
      {
        tot_owed: totalOwed
      },
      {
        where: {
          id: groupID
        }
      }
    );

    for (let friend of grpFriends) {
      await models.Friends.update(
        { tot_owes: friend.tot_owes },
        {
          where: {
            id: friend.id
          }
        }
      );
    }

    await models.Expense.destroy({
      where: {
        id: currentExpense.id
      }
    });

    res.status(200).send("Expense Deleted!!!");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const addFriend = async (req, res) => {
  try {
    //console.log("Add Friends: ", req.fields);

    await models.Friends.create({
      name: req.fields.name,
      from_expense: req.fields.from_expense,
      tot_owes: req.fields.tot_owes,
      groups_id: req.fields.groupID
    });

    await models.Groups.update(
      {
        mem_count: req.fields.mem_count
      },
      {
        where: {
          id: req.fields.groupID
        }
      }
    );

    res.status(200).send("Friend Added!!!");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserGroups,
  createGroup,
  createFriends,
  getUserGroupFriends,
  getUserFirstGrp,
  addExpense,
  deleteExpense,
  addFriend
};
