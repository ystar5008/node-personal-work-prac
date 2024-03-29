'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //
        references: {
          //어떤 테이블에 있는 외래키를 참조할건지, 
          //Users 모델을 참조한다.
          //참조하는 다른 모델을 설정
          model: 'Users',
          // 참조하는 다른 모들의 column을 지정
          //Users 테이블에 있는, userId를 참조한다.
          key: 'userId',
        },
        //Users 테이블에 userId가 삭제된다면 Posts모델의 데이터도 함께삭제
        onDelete: 'cascade',
      },
      nickname: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};