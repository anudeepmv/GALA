const participant=require('../../models/participant')
const activity=require('../../models/activity')

class Participate{

    async delete(data){
        return new Promise(async(resolve,reject)=>{
            participant.findOne({user_id:data.user_id,activity_id:data.activity_id}, function(err, p){
                if(err){
                    reject('User not participated for activity');
                    return;
                }
                p.remove(function(err){
                    if(!err) {
                        activity.findByIdAndUpdate(data.activity_id,{ '$pull': { 'participant': p._id } }).exec();
                        resolve({
                            message: 'Participant removed Successfully.' });
                    }else{
                        reject('User not participated for activity');
                    }
                });
            });
        });
    }

    async add(data){
    return new Promise(async(resolve,reject)=>{
        if(data.subscribe){
            let query={user_id:data.user_id,activity_id:data.activity_id};
            participant.find(query,function(err,joined){

                if(err){
                    reject('Error while checkin participant registered');
                }else if(joined.length>0){
                    resolve({
                        message: 'Participant already joined for this activity' });
                }else{
                    const participated = new participant(query);
                    participated.save().then((p) => {
                        activity.findByIdAndUpdate(data.activity_id,{ '$push': { 'participant': p._id } }).exec();
                    }).then(() => {
                        resolve({
                            message: 'Participant Successfully Saved' });
                    }).catch(() => {
                        reject('Error while saving participant');
                    });
                }

            })
           
        }else{
            participant.findOne({user_id:data.user_id,activity_id:data.activity_id}, function(err, p){
                if(err){
                    reject('User not participated for activity');
                    return;
                }
                p.remove(function(err){
                    if(!err) {
                        activity.findByIdAndUpdate(data.activity_id,{ '$pull': { 'participant': p._id } }).exec();
                        resolve({
                            message: 'Participant removed Successfully.' });
                    }else{
                        reject('User not participated for activity');
                    }
                });
            });
           
        }
       
    });
}

}
module.exports=new Participate();