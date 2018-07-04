// マイグレーション&jsファイル作成
sequelize model:create --name cmn_battle_history --underscored --attributes battle_id:integer,sente:string,gote:string,result:integer,record_json:string

// ファイルに沿ってテーブル作成
sequelize db:migrate --env development