module.exports = (sequelize,DataTipes) => {
    return sequelize.define('monstros',{
    id:{
        type: DataTipes.INTEGER,
        primaryKey: true,
    },
	nome: DataTipes.STRING,
	hp: DataTipes.INTEGER,
    ca: DataTipes.INTEGER,
    des: DataTipes.INTEGER,
    for: DataTipes.INTEGER,
    con: DataTipes.INTEGER,
    int: DataTipes.INTEGER,
    sab: DataTipes.INTEGER,
    car: DataTipes.INTEGER,
    obs: DataTipes.STRING,
    },
    {
        timestamps: false,
    });
};