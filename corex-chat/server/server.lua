local Corex = exports['corex-core']:GetCoreObject()

local function parseMessage(msg)
    if msg:sub(1,4) == "/all" then
        return "all", msg:sub(6)
    elseif msg:sub(1,6) == "/local" then
        return "local", msg:sub(8)
    elseif msg:sub(1,3) == "/me" then
        return "me", msg:sub(5)
    end

    return "local", msg
end

RegisterNetEvent('corex-chat:server:handleMessage', function(msg)
    local src = source
    if not msg or msg == "" then return end

    local name = GetPlayerName(src)
    local chatType, formatted = parseMessage(msg)

    -- GLOBAL CHAT
    if chatType == "all" then
        TriggerClientEvent(
            'corex-chat:client:addMessage',
            -1,
            name,
            formatted,
            "all"
        )
        return
    end

    -- PROXIMITY CHAT
    local players = exports['corex-core']:GetNearbyPlayers(src, 15.0)
    players[src] = true

    for target, _ in pairs(players) do
        TriggerClientEvent(
            'corex-chat:client:addMessage',
            target,
            name,
            formatted,
            chatType
        )

        -- /me overhead trigger
        if chatType == "me" then
            TriggerClientEvent(
                'corex-chat:client:meBubble',
                target,
                src,
                formatted
            )
        end
    end
end)


