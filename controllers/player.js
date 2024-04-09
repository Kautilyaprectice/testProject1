const path = require('path');
const Player = require('../models/player');

exports.getPlayer = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'player.html'));
};

exports.addPlayer = async (req, res, next) => {
    const {name, dob, photourl, birthplace, career, noofmatches, score, fifties, centuries, wickets, average} = req.body;
    try{
        if(!name || !dob || !photourl || !birthplace || !career || !noofmatches || !score || !fifties || !centuries || !wickets || !average){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const player = await Player.create({name, dob, photourl, birthplace, career, noofmatches, score, fifties, centuries, wickets, average});
        res.status(201).json(player);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPlayerByName = async (req, res, next) => {
    const playerName = req.params.name;

    try{
        const player = await Player.findOne({where: {name: playerName}});
        if(!player){
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.editPlayer = async (req, res, next) => {
    const playerId = req.params.id;
    
    try {
        const player = await Player.findByPk(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updatePlayer = async (req, res, next) => {
    const playerId = req.params.id;
    const { name, dob, photourl, birthplace, career, noofmatches, score, fifties, centuries, wickets, average } = req.body;
    
    try {
        const player = await Player.findByPk(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        await player.update({ name, dob, photourl, birthplace, career, noofmatches, score, fifties, centuries, wickets, average });

        res.status(200).json({ message: 'Player updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};