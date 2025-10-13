import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const DashboardRightSideBar = () => {
    return (
      <div>
        <Tabs defaultValue="alertes" className="w-[100%]">
          <TabsList className="w-[100%] py-5">
            <TabsTrigger value="alertes" className="p-4">
              Alertes
            </TabsTrigger>
            <TabsTrigger value="actions" className="p-4">
              Actions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alertes" className="w-[100%]">
            Make changes to your alertes here.
          </TabsContent>
          <TabsContent value="actions" className="w-[100%]">
            Change your actions here.
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default DashboardRightSideBar;