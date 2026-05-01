local chatOpen = false

local function setChatState(state)
    chatOpen = state
    SetNuiFocus(state, state)

    SendNUIMessage({
        type = "toggle",
        state = state
    })
end

RegisterCommand('chat', function()
    setChatState(not chatOpen)
end)

RegisterKeyMapping('chat', 'Open Chat', 'keyboard', 'T')

RegisterNUICallback('sendMessage', function(data, cb)
    if data.message and data.message ~= "" then
        TriggerServerEvent('corex-chat:server:handleMessage', data.message)
    end

    setChatState(false)
    cb({})
end)

RegisterNUICallback('close', function(_, cb)
    setChatState(false)
    cb({})
end)

RegisterNetEvent('corex-chat:client:addMessage', function(name, message, chatType)
    SendNUIMessage({
        type = "chat",
        name = name,
        message = message,
        chatType = chatType
    })
end)

RegisterNetEvent('corex-chat:client:meBubble', function(source, text)
    local player = GetPlayerFromServerId(source)
    if player == -1 then return end

    local ped = GetPlayerPed(player)

    Citizen.CreateThread(function()
        local duration = 5000
        local start = GetGameTimer()

        while GetGameTimer() - start < duration do
            Wait(0)

            local coords = GetEntityCoords(ped)
            DrawText3D(coords.x, coords.y, coords.z + 1.0, "* " .. text)
        end
    end)
end)

function DrawText3D(x, y, z, text)
    local onScreen,_x,_y = World3dToScreen2d(x,y,z)

    if onScreen then
        SetTextScale(0.35, 0.35)
        SetTextFont(4)
        SetTextColour(0, 255, 156, 215)
        SetTextCentre(true)

        BeginTextCommandDisplayText("STRING")
        AddTextComponentSubstringPlayerName(text)
        EndTextCommandDisplayText(_x,_y)
    end
end

