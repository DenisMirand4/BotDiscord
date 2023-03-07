module.exports = (sequelize,DataTipes) => {
    return sequelize.define('batalha', {
    id_batalha:{
        type: DataTipes.UUID,
    },
    nome_batalha:{ 
        type: DataTipes.STRING,
        allowNull: false,
    },
    nome_mestre: DataTipes.STRING,
    id_player:{
        type: DataTipes.INTEGER,
        primaryKey: true,
    },
	nome: DataTipes.STRING,
	hp: DataTipes.INTEGER,
    hp_base: DataTipes.INTEGER,
    ca: DataTipes.INTEGER,
    iniciativa: DataTipes.INTEGER,
    tipo: DataTipes.INTEGER,
    },
    {
        timestamps: false,
    });
};