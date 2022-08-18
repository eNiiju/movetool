mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    print("Init ############################################################");
    db.getSiblingDB('admin').auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
    db.createUser({ user: '$MONGO_INITDB_USERNAME', pwd: '$MONGO_INITDB_PASSWORD', roles: ['readWrite'] });
    db = new Mongo().getDB('$MONGO_INITDB_DATABASE');
    db.createCollection('123', { capped: false });
    print("End Init ########################################################");
EOF
