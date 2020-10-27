import { LightningElement, track, wire, api } from 'lwc';
import getCMSContentForRecordTopics from '@salesforce/apex/ManagedContentController.getCMSContentForRecordTopics';

export default class lwcCMSContentByRecord extends LightningElement {
    
    // Params from config
    @api recordId;
    @api contentType;

    //Params for content
    content;
    error;

    //Fetch CMS content
    
    @wire(getCMSContentForRecordTopics, { recordId: '$recordId', managedContentType: '$contentType' })
    wiredContent({ error, data }) {
        if (data) {
            this.content = JSON.stringify(data.JSON);
        } else if (error) {
            this.error = error;
            this.content = undefined;
        }
    }

}

/* 
({
	getContentForRecordTopics : function(component, event, helper) {
		var action = component.get("c.getCMSContentForRecordTopics");
        action.setParams({recordId : component.get("v.recordId"), managedContentType : component.get("v.managedContentType")});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var myContent = response.getReturnValue();
                component.set("v.CMSContent", myContent);
                
                // set values to help debug
                console.log("CMS Content: " + myContent);
                //alert(JSON.stringify(myContent));
				component.set("v.stringCMSContent", JSON.stringify(response.getReturnValue()));
            } else if (state === "INCOMPLETE") {
                console.log("State incomplete.");
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);                 
	}
})
*/