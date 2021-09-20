import React, { useState } from "react";
import { Route, Switch } from "react-router";
import DiscountChoice from "../components/Auth/DiscountChoice/DiscountChoice";
import MainAuth from "../components/Auth/MainAuth/MainAuth";
import SetData from "../components/Auth/SetData/SetData";
import SplitLayout from "../components/Layout/SplitLayout";

const Auth: React.FC = () => {
    const [discount, setDiscount] = useState<boolean>(false);

    return (
        <SplitLayout>
            <Switch>
                <Route path="/auth/discount-choice" exact>
                    <DiscountChoice
                        applyDiscount={setDiscount.bind(null, true)}
                    />
                </Route>
                <Route path="/auth/set-data" exact>
                    <SetData discount={discount} />
                </Route>
                <Route path="/auth" component={MainAuth} />
            </Switch>
        </SplitLayout>
    );
};

export default Auth;
