module.exports = (sequelize, DataTypes) => { // we are creating a function definition that something is being called and sequelize.
    const Student = sequelize.define('Student', { // we are calling the name of the database.
        name:{
            type: DataTypes.STRING,
            allowNull: false, // making sure that the name needs to entered into the system.
            validate: { // validating the value to ensure that it works for both name and starID
                notEmpty: true
            }
        },
        starID:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // this focuses on the uniqueness of the starID value.
            validate: {
                notEmpty: true
            }
        },
        present:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false // this will be the default setting when webpage first appears for the student.
        }
    })// databases cares about what type of data you're typing and presenting the datatypes properly.
    Student.sync( { force: true } ).then(() => {
        console.log('Student synced!'); // if the student is fully synced into the database, it will appear with a message on the console log.
    })// returning a promise.

    return Student // returning the student section.
}
