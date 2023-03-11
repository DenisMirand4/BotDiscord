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
    frc: DataTipes.INTEGER,
    con: DataTipes.INTEGER,
    ntl: DataTipes.INTEGER,
    sab: DataTipes.INTEGER,
    car: DataTipes.INTEGER,
    obs: DataTipes.STRING,
    },
    {
        freezeTableName: true,
        timestamps: false,
    });
};