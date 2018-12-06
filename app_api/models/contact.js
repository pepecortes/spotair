module.exports = function(sequelize, DataTypes) {
	
	const Model = sequelize.define("contact", {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
			type: DataTypes.STRING,
			allowNull: false,
		}, 
    address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false,
    },
  },

	
	);
	
	return Model;
};
