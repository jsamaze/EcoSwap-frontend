function loadChat(){
    this.axios.get(`${import.meta.env.VITE_BACKEND}/chat/user/${this.activeChatUser}`).then(
      (response) =>{
        var currentChat = response.data.data
        if(this.userStore.username == currentChat.seller.username){
          this.mySelectedItems =  currentChat.sellerItems.map((item)=>item._id )
          // this.otherSelectedItems = currentChat.buyerItems.map((item)=>item._id )
          this.myRole = "seller"
        } else {
          this.mySelectedItems =  currentChat.buyerItems.map((item)=>item._id )
          // this.otherSelectedItems = currentChat.sellerItems.map((item)=>item._id )
          this.myRole = "buyer"
        }
        this.currentMessages = currentChat.messages
        this.itemChatStore.username = this.activeChatUser;
        this.itemChatStore.items = currentChat.sellerItems.map((item)=>item._id );
        this.endChatSuccessWaiting = 
          (currentChat.buyerClose && this.userStore.username == currentChat.buyer.username) ||
          (currentChat.sellerClose && this.userStore.username == currentChat.seller.username) 
        this.endChatSuccessNeedResponse=
          !this.endChatSuccessWaiting && (currentChat.buyerClose || currentChat.sellerClose)
      }).catch((error)=>{
      })



      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
    params : { itemType : "Listed",
  username: this.userStore.username}
  }).then(
      (response) =>{
        console.log(response)
        this.myListedItems = response.data.data
        
      }).catch((error)=>{
      })


      
      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
    params : { itemType : "Listed",
  username: this.activeChatUser}
  }).then(
      (response) =>{
        console.log(response)
        this.otherListedItems = response.data.data
        
      }).catch((error)=>{
      })
  }