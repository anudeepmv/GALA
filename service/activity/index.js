///https://github.com/anudeepmv/WEBSTER/issues/18
///https://github.com/anudeepmv/WEBSTER/issues/22
///This is the service implementation of #22 https://www.webosose.org/docs/tutorials/js-services/developing-external-js-services/
const activity=require('../../models/activity')
const participant=require('../../models/participant')
/// This class activities is to find the activity by id or user
class Activitys{
  
    async get(data,query){
        return new Promise(async(resolve,reject)=>{
            let limit=query.limit || 10;
            let skip = query.page?((query.page-1)*limit) : 0;
            activity.find({org_id:data.org_id,limit:limit,skip:skip}).populate({
                path : 'participant',
                populate : {
                  path : 'user_id',
                  select: '_id email phone first_name last_name role org_id'
                }
              }).exec((err, activities) => {
                if (err) {
                    logger.error(err)
                    reject('Error getting activities');
                }
                else {
                    activities=JSON.parse(JSON.stringify(activities));
                    activities=activities.map((item)=>{
                        let enroll=item.participant.some((ids)=>{
                            return (ids.user_id && (ids.user_id._id==data._id))
                            });
                        item.enrolled=enroll;
                        return item;
                    })
                    activity.count({org_id:data.org_id},function(err,total){
                        if(err){
                            reject('Error getting total activities');
                        }else{
                            resolve({data:activities,total:total});
                        }
                    })  
                }
            });
          
    
        });
    }
    /// The function id is to find the activity through the method findbyid
    async byId(id){
        return new Promise(async(resolve,reject)=>{
            activity.findById(id).populate({
                path : 'participant',
                populate : {
                  path : 'user_id',
                  select: '_id email phone first_name last_name role org_id'
                }
              }).exec((err, activities) => {
                if (err) {
                    logger.error(err)
                    reject('Error getting activities');
                }
                else {
                   resolve(activities);
                }
            });
          
    
        });
    }
///This function is to find the activity by user through the method find
    async byUser(id){
        return new Promise(async(resolve,reject)=>{
            participant.find({ user_id: id}).populate('activity_id').exec((err, activities) => {
                if (err) {
                    logger.error(err)
                    reject('Error getting activities');
                }
                else {
                    resolve(activities);
                }
            });
          
    
        });
    }
    /// This function is to delete the activity by id
    async delete(id){
        return new Promise(async(resolve,reject)=>{
            activity.remove({_id:id}).exec((err, activities) => {
                if (err) {
                    logger.error(err)
                    reject('Error deleting activities');
                }
                else {
                    participant.remove({_id:{ $in: activities.participant}})
                    resolve(activities);
                }
            });
          
    
        });
    }
    async add(data){
    return new Promise(async(resolve,reject)=>{
     
        let activityData = new activity(data);
        activityData.save((err, activities) => {
            if (err) {
                logger.error(err)
                reject('Error while saving acitivity');
            }
            else {
                resolve(activities);
            }
        });
      

    });
}

///This function is to update the activity by the method findbyidandupdate
async update(id,data){
    return new Promise(async(resolve,reject)=>{
        activity.findByIdAndUpdate(id, data, function(err, u){
            if(err){
                reject('Error while updating activity');
            }else{
                resolve({
                    message: 'Acitivity updated Successfully'
                });
            }

        })
    });
}

}
module.exports=new Activitys();
