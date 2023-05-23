const {Schema,model}=require("mongoose")
const bcrypt = require('bcrypt');
const { defaultImagePath } = require("../secret");

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"user name is required"],
        trime:true
    },

    email:{
        type:String,
        required:[true,"email is required"],
        trime:true,
        lowercase:true,
        unique:true,
        validate:{
        validator: function (value) {
        // Regular expression to validate email format
        return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(value);
              },
              message: 'Invalid email format'
            }
        },
        password:{
            type: String,
            required: true,
            minlength:[6,"password must be at least 6 characters"],
            set:(v)=>bcrypt.hashSync(v,bcrypt.genSaltSync(10))
            
        },
        
        image:{
            type: String,
            default:defaultImagePath
        },

        address:{
            type: String,
            required: [true,'user address is required']
        },

        phone:{
            type: String,
            required: [true,'user phone is required']

        },

        isAdmin:{
            type: Boolean,
            default: false
        },

        isBanned:{
            type: Boolean,
            default: false
        }

    
},{timestamps:true,versionKey:false})

const User=model("users",userSchema)

module.exports=User;