
import apiService from "../../services/itemGroupApi";
import childApiService from "../../services/itemFieldApi"

import CoreTableLayout from "../Core/Table/TableLayout";
function ItemGroup(props) {

    const itemGroupProp = {
        Name: {
            ControlType: "Text"
        },
        Description: {
            ControlType: "Text"
        }
    }

    const itemFieldProp = {
        Name: {
            ControlType: "Text"
        },
        Description: {
            ControlType: "Text"
        },
        DataType: {
            ControlType: "Select",
            Options: [
                "String",
                "Password"
            ]
        }
    }

    return (
        
        <div className="ItemGroup">
            <CoreTableLayout apiService={apiService} childApiService={childApiService} title="ItemGroup" childTitle="ItemField" modalProp={itemGroupProp} childModalProp={itemFieldProp}></CoreTableLayout>
        </div>
    );
}

export default ItemGroup;
