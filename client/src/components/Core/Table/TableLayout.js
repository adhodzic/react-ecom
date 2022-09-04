import { useState } from "react";
import CoreTable from "./Table";

function CoreTableLayout({apiService, childApiService, title, childTitle, modalProp, childModalProp}) {
    const [selectedRow, setSelectedRow] = useState();
    return (
        <div className="CoreTableLayout">
            <CoreTable apiService={apiService} selectedRow={selectedRow} setSelectedRow={setSelectedRow} title={title} modalProp={modalProp}></CoreTable>
            {(childApiService && selectedRow) && <CoreTable apiService={childApiService} title={childTitle} parentRow={selectedRow} modalProp={childModalProp}></CoreTable>}
        </div>
    );
}

export default CoreTableLayout;
