module.exports = (sequelize,DataTipes) => {
    return sequelize.define('jogadores',{
    id:{
        type: DataTipes.INTEGER,
        primaryKey: true,
    },
	nome: DataTipes.STRING,
	hp: DataTipes.INTEGER,
    ca: DataTipes.INTEGER
    },
    {
        timestamps: false,
    });
};